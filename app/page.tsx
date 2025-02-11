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
    <div className="container">
      <header>
        <h1>VFS Incinerator</h1>
      </header>
      
      {/* VeChain Status with updated styling */}
      <div className="vechain-container">
        <div className="vechain-status">
          <p className="status-text">
            VeChain Status: 
            <span className={isConnected ? "status-connected" : "status-disconnected"}>
              {isConnected ? " Connected" : " Not Connected"}
            </span>
          </p>
          {isConnected && (
            <>
              <p className="block-number">Block: {blockNumber}</p>
              <WalletConnect />
            </>
          )}
        </div>
      </div>

      <main>
        <div className="button-container">
          <a href="#" className="button flame-button">
            Burn Now
          </a>
          <a href="/mission" className="button">
            Mission
          </a>
          <a href="#" className="button">
            Vote
          </a>
          <a href="#" className="button">
            Contact
          </a>
        </div>
      </main>
      
      <footer>
        <p>&copy; 2023 VFS Incinerator. All rights reserved.</p>
      </footer>
    </div>
  )
}

