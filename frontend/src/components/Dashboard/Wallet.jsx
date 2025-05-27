import React from "react"
import { CreditCard } from "lucide-react"

const Wallet = () => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <h3 className="text-lg font-medium text-gray-800 mb-4">Wallet</h3>

      <div className="h-48 rounded-xl bg-gradient-to-r from-blue-600 to-purple-500 p-5 text-white relative overflow-hidden">
        <div className="absolute top-4 right-4">
          <CreditCard className="h-8 w-8 text-white opacity-60" />
        </div>

        <div className="mt-2">
          <div className="text-xl font-bold mb-1">Buy-Ora</div>
          <div className="text-sm opacity-80">$5,756</div>
        </div>

        <div className="absolute bottom-4 left-5">
          <div className="text-xs opacity-80">CARD HOLDER</div>
          <div className="font-medium">YUVARAJA</div>
        </div>

        <div className="absolute bottom-4 right-5">
          <div className="text-xs opacity-80">VALID THRU</div>
          <div className="font-medium">12/22</div>
        </div>

        <div className="absolute bottom-12 left-5 right-5">
          <div className="font-medium tracking-wider">3778 **** **** 1234</div>
        </div>

        <div className="absolute bottom-4 right-12">
          <div className="flex space-x-1">
            <div className="w-6 h-6 rounded-full bg-white opacity-70"></div>
            <div className="w-6 h-6 rounded-full bg-amber-500 opacity-70"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Wallet
