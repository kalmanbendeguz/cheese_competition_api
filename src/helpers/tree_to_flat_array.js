const tree_to_flat_array = (node, parent_id = null, result = []) => {
    result.push({ node_id: node.id, parent_id: parent_id })

    if (node.children && Array.isArray(node.children) && node.children.length > 0) {
        for (const child of node.children) {
            tree_to_flat_array(child, node.id, result)
        }
    }

    return result
}

module.exports = tree_to_flat_array