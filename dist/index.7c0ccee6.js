const heading = React.createElement("h1", {
    id: "title1"
}, "This is my first react heading");
const heading2 = React.createElement("h2", {
    id: "title2"
}, "This is second heading");
const container = React.createElement("div", {
    id: "container"
}, [
    heading,
    heading2
]);
console.log(container);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(container);

//# sourceMappingURL=index.7c0ccee6.js.map
