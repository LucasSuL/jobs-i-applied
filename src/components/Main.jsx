import { CATEGORIES } from "../../data";
import Tag from "./Tag";
import Fact from "./Fact";


export default function Content({
  factList,
  setFactList,
  isLoaded,
  setSelectedCategory,
}) {
  const handleTagClick = (categoryName) => {
    setSelectedCategory(categoryName);
  };

  const handleAllClick = () => {
    setSelectedCategory("all"); // Reset filter to show all facts
  };

  const Loader = () => {
    return [...Array(5)].map(() => (
      <div
        className="bg-secondary p-2 m-2 mb-3 rounded d-flex align-items-center row"
        key={Math.random() * 1000000}
      >
        <div className="p-2 col-7 pe-3 ">
          <div className="skeleton skeleton-text mb-2 rounded"></div>
          <div className="skeleton skeleton-text mb-2 rounded"></div>
          <div className="skeleton skeleton-text rounded"></div>
        </div>

        <div className="skeleton skeleton-text tag p-1 rounded col-2 "></div>

        <div className="vote-buttons p-0 col-3 d-flex justify-content-end">
          <button className="skeleton btn m-1 p-1"> </button>
          <button className="skeleton btn m-1 p-1"> </button>
          <button className="skeleton btn m-1 p-1"> </button>
        </div>
      </div>
    ));
  };

  const facts = isLoaded ? (
    factList.map((fact) => {
      return <Fact key={fact.id} fact={fact}  setFactList={setFactList}/>;
    })
  ) : (
    <Loader />
  );

  const tags = CATEGORIES.map((category) => {
    return (
      <Tag
        key={category.name}
        name={category.name}
        color={category.color}
        onClick={handleTagClick}
        isLoaded={isLoaded}
      />
    );
  });

  return (
    <div className="container ">
      <div className="row">
        <div className="tags col-3 d-flex flex-column p-1 ">
          <button
            className="btn btn-all m-1 tag text-light fw-bold mb-4"
            onClick={handleAllClick}
          >
            All
            {/* {!isLoaded && (
              <div class="spinner-border spinner-border-sm ms-2" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
            )} */}
          </button>
          {tags}
        </div>
        <div className="main col-9 p-1 ">
          {facts.length == 0 ? (
            <p className="p-1">
              No facts for this category, create your first one!
            </p>
          ) : (
            facts
          )}
        </div>
      </div>
    </div>
  );
}
