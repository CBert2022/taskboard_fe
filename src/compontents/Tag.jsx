import "./Tag.css";

const Tag = ({ tagName, selectTag, selected }) => {
  // console.log("props", props);

  // Inline Style Background für Tags
  const tagStyle = {
    HTML: { backgroundColor: "#fda821" },
    CSS: { backgroundColor: "#15d4c8" },
    JS: { backgroundColor: "#ffd12c" },
    React: { backgroundColor: "#4cdafc" },
    default: { backgroundColor: "#f9f9f9" },
  };

  return (
    <div>
      <button
        type="button"
        className="tag"
        onClick={() => selectTag(tagName)}
        style={selected ? tagStyle[tagName] : tagStyle.default}
      >
        {/* Arrowfkt, da die Funktion sonst nur einmal läuft selectet(tag) */}
        {tagName}
      </button>
    </div>
  );
};

export default Tag;
