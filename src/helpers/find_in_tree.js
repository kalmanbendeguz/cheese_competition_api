// Function to find elements in a tree
const find_in_tree = (tree, predicate) => {
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

module.exports = find_in_tree