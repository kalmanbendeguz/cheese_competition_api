// Function to find elements in the tree
function find_in_tree(tree, predicate) {
    if (predicate(tree)) {
        return tree
    } else {
        for (const child of tree.children) {
            const result = find_in_tree(child, predicate)
            if (result) {
                return result
            }
        }
    }
    return null
}
//// NEED TO EXPORT !!!!!!!!!!!!!!!