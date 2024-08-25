import React, { Fragment } from "react";
import "./styles.css";
import { IoMdAddCircleOutline } from "react-icons/io";
import { MdOutlineRemoveCircleOutline } from "react-icons/md";
import {
  useForm,
  SubmitHandler,
  useFieldArray,
  Controller,
} from "react-hook-form";

export default function DynamicForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    control,
  } = useForm({
    defaultValues: {
      blogPosts: [{ blogPostBody: "", blogPostTags: "" }],
      productListings: [{ productName: "", price: "", category: "" }],
      events: [{ eventDate: "", location: "", description: "" }],
    },
  });

  const blogPostFields = useFieldArray({ name: "blogPosts", control });
  const productListingFields = useFieldArray({
    name: "productListings",
    control,
  });
  const eventFields = useFieldArray({ name: "events", control });

  function onSubmit(data) {
    console.log("=========data", data);
  }

  console.log("========watch('content-type')", watch("content-type"));
  console.log("========errors", errors);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="container">
        <h1 className="title">Create New Content</h1>
        <div>
          <label htmlFor="content-type" className="content-type-label">
            Content Type
          </label>
          <select
            className="content-type-dropdown"
            name="content-type"
            id="content-type"
            {...register("content-type")}
          >
            <option value="Blog Post">Blog Post</option>
            <option value="Product Listing">Product Listing</option>
            <option value="Event">Event</option>
          </select>
        </div>

        <hr />

        <div className="section">
          <div>
            <label htmlFor="content-title" className="content-title">
              Title
            </label>
            <input
              className="content-input"
              name="content-title"
              id="content-title"
              type="text"
              placeholder="Enter title"
              {...register("content-title", { required: "Title is required" })}
            />
            {errors["content-title"] && (
              <span className="error-message">
                {errors["content-title"]?.message}
              </span>
            )}
          </div>

          <div>
            <label htmlFor="content-author" className="content-author">
              Author
            </label>
            <input
              className="content-author-input"
              name="content-author"
              id="content-author"
              type="text"
              placeholder="Enter author name"
              {...register("content-author", {
                required: "Author is required",
              })}
            />
            {errors["content-author"] && (
              <span className="error-message">
                {errors["content-author"]?.message}
              </span>
            )}
          </div>
        </div>

        <hr />

        {(watch("content-type") === "Blog Post" ||
          watch("content-type") === undefined) && (
          <>
            {blogPostFields.fields.map((field, index) => (
              <Fragment key={field.id}>
                <div>
                  <label
                    htmlFor={`blog-post-body-${index}`}
                    className="body-label"
                  >
                    Body
                  </label>
                  <Controller
                    render={({ field }) => (
                      <textarea
                        {...field}
                        className="blog-post-body"
                        id={`blog-post-body-${index}`}
                        placeholder="Enter body text here..."
                      ></textarea>
                    )}
                    control={control}
                    name={`blogPosts.${index}.blogPostBody`}
                  />

                  {errors?.blogPosts?.[index]?.blogPostBody && (
                    <span className="error-message">
                      {errors?.blogPosts?.[index]?.blogPostBody?.message}
                    </span>
                  )}
                </div>

                <div>
                  <label
                    htmlFor={`blog-post-tags-${index}`}
                    className="tags-label"
                  >
                    Tags
                  </label>

                  <Controller
                    render={({ field }) => (
                      <input
                        {...field}
                        id={`blog-post-tags-${index}`}
                        className="tags-input"
                        placeholder="Enter tags"
                      />
                    )}
                    control={control}
                    name={`blogPosts.${index}.blogPostTags`}
                  />

                  {errors?.blogPosts?.[index]?.blogPostTags && (
                    <span className="error-message">
                      {errors?.blogPosts?.[index]?.blogPostTags?.message}
                    </span>
                  )}
                </div>

                {blogPostFields.fields.length > 1 && (
                  <button
                    className="remove-field-btn"
                    onClick={() => blogPostFields.remove(index)}
                  >
                    <span className="icon">
                      <MdOutlineRemoveCircleOutline />
                    </span>{" "}
                    Remove Field
                  </button>
                )}
              </Fragment>
            ))}
            <button
              className="add-field-btn"
              onClick={() =>
                blogPostFields.append({ blogPostBody: "", blogPostTags: "" })
              }
            >
              <span className="icon">
                <IoMdAddCircleOutline />
              </span>{" "}
              Add Field
            </button>
          </>
        )}

        {watch("content-type") === "Product Listing" && (
          <>
            {productListingFields.fields.map((field, index) => (
              <Fragment key={field.id}>
                <div className="section">
                  <div>
                    <label
                      htmlFor={`product-name-${index}`}
                      className="product-name-label"
                    >
                      Product Name
                    </label>
                    <Controller
                      render={({ field }) => (
                        <input
                          {...field}
                          id={`product-name-${index}`}
                          className="product-name-input"
                          placeholder="Enter product name"
                        />
                      )}
                      control={control}
                      name={`productListings.${index}.productName`}
                    />
                    {errors?.productListings?.[index]?.productName && (
                      <span className="error-message">
                        {errors?.productListings?.[index]?.productName?.message}
                      </span>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor={`product-price-${index}`}
                      className="price-label"
                    >
                      Price
                    </label>
                    <Controller
                      render={({ field }) => (
                        <input
                          {...field}
                          id={`product-price-${index}`}
                          className="price-input"
                          placeholder="Enter price"
                        />
                      )}
                      name={`productListings.${index}.price`}
                      control={control}
                    />
                    {errors?.productListings?.[index]?.price && (
                      <span className="error-message">
                        {errors?.productListings?.[index]?.price?.message}
                      </span>
                    )}
                  </div>
                </div>

                <div className="category-section">
                  <label
                    htmlFor={`product-category-${index}`}
                    className="category-label"
                  >
                    Category
                  </label>
                  <Controller
                    render={({ field }) => (
                      <select
                        {...field}
                        className="category-dropdown"
                        id={`product-category-${index}`}
                      >
                        <option selected value="" disabled>
                          Select category option
                        </option>
                        <option value="Art & Design">Art & Design</option>
                        <option value="Business">Business</option>
                        <option value="Education">Education</option>
                        <option value="Entertainment">Entertainment</option>
                        <option value="Fashion">Fashion</option>
                        <option value="Finance">Finance</option>
                        <option value="Food & Beverage">Food & Beverage</option>
                        <option value="Health & Wellness">
                          Health & Wellness
                        </option>
                        <option value="Home & Garden">Home & Garden</option>
                        <option value="Lifestyle">Lifestyle</option>
                        <option value="Parenting">Parenting</option>
                        <option value="Personal Development">
                          Personal Development
                        </option>
                        <option value="Sports">Sports</option>
                        <option value="Technology">Technology</option>
                        <option value="Travel">Travel</option>
                      </select>
                    )}
                    control={control}
                    name={`productListings.${index}.category`}
                  />
                  {errors?.productListings?.[index]?.category && (
                    <span className="error-message">
                      {errors?.productListings?.[index]?.category?.message}
                    </span>
                  )}
                </div>

                {productListingFields.fields.length > 1 && (
                  <button
                    className="remove-field-btn"
                    onClick={() => productListingFields.remove(index)}
                  >
                    <span className="icon">
                      <MdOutlineRemoveCircleOutline />
                    </span>{" "}
                    Remove Field
                  </button>
                )}
              </Fragment>
            ))}

            <button
              className="add-field-btn"
              onClick={() =>
                productListingFields.append({
                  productName: "",
                  price: "",
                  category: "",
                })
              }
            >
              <span className="icon">
                <IoMdAddCircleOutline />
              </span>{" "}
              Add Field
            </button>
          </>
        )}

        {watch("content-type") === "Event" && (
          <>
            {eventFields.fields.map((field, index) => (
              <Fragment key={field.id}>
                <div className="section">
                  <div>
                    <label
                      htmlFor={`event-date-${index}`}
                      className="event-date-label"
                    >
                      Event Date
                    </label>
                    <Controller
                      render={({ field }) => (
                        <input
                          {...field}
                          id={`event-date-${index}`}
                          className="event-date-input"
                          type="date"
                          required
                        />
                      )}
                      control={control}
                      name={`eventFields.${index}.eventDate`}
                    />
                    {errors?.eventFields?.[index]?.eventDate && (
                      <span className="error-message">
                        {errors?.eventFields?.[index]?.eventDate?.message}
                      </span>
                    )}
                  </div>

                  <div>
                    <label htmlFor="location" className="location-label">
                      Location
                    </label>
                    <Controller
                      render={({ field }) => (
                        <input
                          {...field}
                          name="location"
                          id="location"
                          className="location-input"
                          type="text"
                          placeholder="Enter location"
                        />
                      )}
                      control={control}
                      name={`eventFields.${index}.location`}
                    />
                    {errors?.eventFields?.[index]?.location && (
                      <span className="error-message">
                        {errors?.eventFields?.[index]?.location?.message}
                      </span>
                    )}
                  </div>
                </div>

                <div className="category-section">
                  <label htmlFor="description" className="description-label">
                    Description
                  </label>
                  <Controller
                    render={({ field }) => (
                      <textarea
                        {...field}
                        className="description-textarea"
                        name="description"
                        id="description"
                        placeholder="Enter description"
                      ></textarea>
                    )}
                    control={control}
                    name={`eventFields.${index}.description`}
                  />
                  {errors?.eventFields?.[index]?.description && (
                    <span className="error-message">
                      {errors?.eventFields?.[index]?.description?.message}
                    </span>
                  )}
                </div>

                {eventFields.fields.length > 1 && (
                  <button
                    className="remove-field-btn"
                    onClick={() => eventFields.remove(index)}
                  >
                    <span className="icon">
                      <MdOutlineRemoveCircleOutline />
                    </span>{" "}
                    Remove Field
                  </button>
                )}
              </Fragment>
            ))}

            <button
              className="add-field-btn"
              onClick={() =>
                eventFields.append({
                  eventDate: "",
                  location: "",
                  description: "",
                })
              }
            >
              <span className="icon">
                <IoMdAddCircleOutline />
              </span>{" "}
              Add Field
            </button>
          </>
        )}

        <button type="submit" className="submit-btn">
          Submit
        </button>
      </div>
    </form>
  );
}
