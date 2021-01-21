// Get the div whose change in attributes we are interested in.
var targetNode = document.getElementById("femaleDiv");

// Set the mutation observer to only listen to attribute mutations
var config = { attributes: true };

// This will be called when a mutation has been observed
var callback = function (mutationsList) {
  for (var mutation of mutationsList) {
    if (mutation.type == "attributes") {
      console.log(mutation);
      console.log("The " + mutation.attributeName + " attribute was modified.");
      if (targetNode.style.display == "block") {
        document.getElementById("textToHide").style.display = "none";
      }
    }
  }
};

// Create the observer
var observer = new MutationObserver(callback);

// Start observing
observer.observe(targetNode, config);

// Uncomment this to stop observing at at the right place.
// observer.disconnect();
