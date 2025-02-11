import { Connex } from '@vechain/connex'

declare global {
    interface Window {
        readonly connex?: Connex;
    }
}

// Keep all your existing code below this point!
// Don't delete your component code or other functions
// Only replace the 'declare global' part at the top

export default function WalletConnect() {
    const [isInstalled, setIsInstalled] = useState<boolean>(false)
    const [address, setAddress] = useState('')
    const [balance, setBalance] = useState('')

    useEffect(() => {
        const isWalletInstalled = checkWalletInstalled()
        setIsInstalled(isWalletInstalled)
    }, [])

    const handleConnect = async () => {
        const walletInfo = await connectWallet()
        if (walletInfo) {
            setAddress(walletInfo.address)
            setBalance(walletInfo.balance)
        }
    }

    if (!isInstalled) {
        return (
            <div className="text-red-500">
                VeWorld wallet not installed. Please install it from 
                <a href="https://www.veworld.net" target="_blank" rel="noopener noreferrer" 
                   className="underline ml-1">
                    veworld.net
                </a>
            </div>
        )
    }

    return (
        <div className="space-y-4">
            {!address ? (
                <button 
                    onClick={handleConnect}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    Connect VeWorld Wallet
                </button>
            ) : (
                <div className="space-y-2">
                    <p>Address: {address.slice(0,6)}...{address.slice(-4)}</p>
                    <p>Balance: {balance} VET</p>
                </div>
            )}
        </div>
    )
} 
