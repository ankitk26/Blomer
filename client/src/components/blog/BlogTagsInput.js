import React from "react";

const BlogTagsInput = ({ tags, blog, setBlog }) => {
  const addTag = (e) => {
    if (
      e.key === "Enter" &&
      e.target.value !== "" &&
      !tags.find((tag) => tag.toLowerCase() === e.target.value.toLowerCase())
    ) {
      setBlog({ ...blog, tags: [...tags, e.target.value] });
      e.target.value = "";
    }
  };

  const removeTag = (index) => {
    setBlog({ ...blog, tags: [...tags.filter((tag) => tags.indexOf(tag) !== index)] });
  };

  return (
    <div className="flex flex-col w-full">
      <label htmlFor="tags">Tags</label>
      <div className={`flex items-center w-11/12 p-2 mt-2 text-gray-600 ${tags.length !== 0 && "gap-5"}`}>
        <ul className="flex items-center gap-5">
          {tags.map((tag, index) => (
            <li
              key={index}
              className="flex items-center justify-between gap-2 px-3 py-1 text-sm font-bold text-purple-700 bg-transparent border border-purple-700 rounded-full"
            >
              <span>{tag}</span>
              <i className="text-sm cursor-pointer material-icons hover:font-bold" onClick={() => removeTag(index)}>
                close
              </i>
            </li>
          ))}
        </ul>
        <input
          type="text"
          className="w-full mt-0 form-control-blog"
          placeholder="Press enter to add tags"
          onKeyUp={(e) => addTag(e)}
        />
      </div>
    </div>
  );
};

export default BlogTagsInput;
