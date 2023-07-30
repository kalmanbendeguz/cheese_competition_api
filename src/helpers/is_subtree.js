const tree_to_flat_array = require('./tree_to_flat_array')

const is_subtree = (subtree, tree) => {
    const nodes_of_subtree = tree_to_flat_array(subtree)
    const nodes_of_tree = tree_to_flat_array(tree)

    for (const node of nodes_of_subtree) {
        // Node should exist in the original tree
        const matching_original_node = nodes_of_tree.find(existing_node => existing_node.node_id === node.node_id)
        if (!matching_original_node) {
            return false
        }
        // The parent of Node in the tested tree should be the same as the parent of Node in the original tree
        // Note that null === null is TRUE
        if (node.parent_id !== matching_original_node.parent_id) {
            return false
        }
    }

    return true
}

module.exports = is_subtree