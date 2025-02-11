"use client"

// If you need to import anything from script.js, uncomment and specify what to import
// import { someFunction } from "../script"

import { useEffect, useState } from 'react'
import { checkConnection, getCurrentBlock } from '../utils/vechain'
import WalletConnect from '../components/WalletConnect'

export default function Home() {
  const [isConnected, setIsConnected] = useState<boolean>(false)
  const [blockNumber, setBlockNumber] = useState<number>(0)

  useEffect(() => {
    const testConnection = async () => {
      // Check if we can connect to VeChain
      const connected = await checkConnection()
      setIsConnected(connected)

      if (connected) {
        // Get the current block number
        const currentBlock = await getCurrentBlock()
        setBlockNumber(currentBlock)
      }
    }

    testConnection()
  }, [])

  return (
    <main className="min-h-screen p-24">
      <h1 className="text-4xl font-bold mb-8">VeChain Connection Test</h1>
      
      <div className="space-y-4">
        <p>Connection Status: 
          <span className={isConnected ? "text-green-500" : "text-red-500"}>
            {isConnected ? " Connected" : " Not Connected"}
          </span>
        </p>
        
        {isConnected && (
          <>
            <p>Current Block Number: {blockNumber}</p>
            <div className="mt-8">
              <WalletConnect />
            </div>
          </>
        )}
      </div>
    </main>
  )
}

