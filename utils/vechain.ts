import { Connex } from '@vechain/connex'

// Initialize Connex to connect to VeChain Thor network
// Using the testnet for development
const connex = new Connex({
    node: 'https://testnet.node.vechain.energy',  // Alternative testnet node
    network: 'test'
})

// Export a function to get the connection
export const getVeChainConnection = () => {
    return connex
}

// Function to get current block number
export const getCurrentBlock = async () => {
    try {
        console.log('Attempting to get block...')
        // Try to get the best (latest) block instead of a specific one
        const block = await connex.thor.ticker().next()
        console.log('Block received:', block)
        return block ? block.number : 0
    } catch (error) {
        console.error('Error getting block:', error)
        return 0
    }
}

// Function to check connection
export const checkConnection = async () => {
    try {
        console.log('Checking connection...')
        const block = await getCurrentBlock()
        console.log('Block number:', block)
        // Consider connection successful if we get any response
        return true
    } catch (error) {
        console.error('VeChain connection error:', error)
        return false
    }
} 