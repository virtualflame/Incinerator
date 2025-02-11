import { Connex } from '@vechain/connex'
import { getVeChainConnection } from './vechain'

// Interface for wallet info
interface WalletInfo {
    address: string;
    balance: string;
}

// Function to check if VeWorld wallet is installed
export const checkWalletInstalled = () => {
    return typeof window !== 'undefined' && window.connex && window.connex.vendor
}

// Function to connect wallet
export const connectWallet = async (): Promise<WalletInfo | null> => {
    try {
        if (!checkWalletInstalled()) {
            throw new Error('VeWorld wallet not installed')
        }

        // Request wallet connection
        const certificateResponse = await window.connex.vendor.sign('cert', {
            purpose: 'identification',
            payload: {
                type: 'text',
                content: 'Connect to VFS Incinerator'
            }
        })

        if (certificateResponse.annex.domain !== window.location.hostname) {
            throw new Error('Domain verification failed')
        }

        const address = certificateResponse.annex.signer
        const connex = getVeChainConnection()
        const vet = await connex.thor.account(address).get()
        const balance = vet ? connex.thor.formatBalance(vet.balance) : '0'

        return {
            address,
            balance
        }
    } catch (error) {
        console.error('Wallet connection error:', error)
        return null
    }
} 