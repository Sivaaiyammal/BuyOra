import React, { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "../../components/ui/dialog"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { Textarea } from "../../components/ui/textarea"
import { Edit } from "lucide-react"

const EditSellerDialog = ({ sellerId, currentData }) => {
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState({
    sellerName: currentData?.sellerName || "Leo",
    brandName: currentData?.brandName || "ZARA",
    email: currentData?.email || "zarafashionworld@dayrep.com",
    phone: currentData?.phone || "812-801-9335",
    website: currentData?.website || "www.zarafashion.co",
    address: currentData?.address || "",
    gstNumber: currentData?.gstNumber || "",
    bankName: currentData?.bankName || "",
    accountNumber: currentData?.accountNumber || "",
    ifscCode: currentData?.ifscCode || ""
  })

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = e => {
    e.preventDefault()
    console.log("Updated seller data:", { sellerId, ...formData })
    // Add your update logic here
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          size="sm"
          variant="outline"
          className="flex items-center space-x-1"
        >
          <Edit className="h-4 w-4" />
          <span>Edit</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Seller Details - {sellerId}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="sellerName">Seller Name</Label>
              <Input
                id="sellerName"
                value={formData.sellerName}
                onChange={e => handleInputChange("sellerName", e.target.value)}
                className="bg-gray-50 border border-gray-300"
              />
            </div>

            <div>
              <Label htmlFor="brandName">Brand Name</Label>
              <Input
                id="brandName"
                value={formData.brandName}
                onChange={e => handleInputChange("brandName", e.target.value)}
                className="bg-gray-50 border border-gray-300"
              />
            </div>

            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={e => handleInputChange("email", e.target.value)}
                className="bg-gray-50 border border-gray-300"
              />
            </div>

            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={e => handleInputChange("phone", e.target.value)}
                className="bg-gray-50 border border-gray-300"
              />
            </div>

            <div className="md:col-span-2">
              <Label htmlFor="website">Website</Label>
              <Input
                id="website"
                value={formData.website}
                onChange={e => handleInputChange("website", e.target.value)}
                className="bg-gray-50 border border-gray-300"
              />
            </div>

            <div className="md:col-span-2">
              <Label htmlFor="address">Address</Label>
              <Textarea
                id="address"
                value={formData.address}
                onChange={e => handleInputChange("address", e.target.value)}
                className="bg-gray-50 border border-gray-300"
                placeholder="Enter full address..."
              />
            </div>

            <div>
              <Label htmlFor="gstNumber">GST Number</Label>
              <Input
                id="gstNumber"
                value={formData.gstNumber}
                onChange={e => handleInputChange("gstNumber", e.target.value)}
                className="bg-gray-50 border border-gray-300"
              />
            </div>

            <div>
              <Label htmlFor="bankName">Bank Name</Label>
              <Input
                id="bankName"
                value={formData.bankName}
                onChange={e => handleInputChange("bankName", e.target.value)}
                className="bg-gray-50 border border-gray-300"
              />
            </div>

            <div>
              <Label htmlFor="accountNumber">Account Number</Label>
              <Input
                id="accountNumber"
                value={formData.accountNumber}
                onChange={e =>
                  handleInputChange("accountNumber", e.target.value)
                }
                className="bg-gray-50 border border-gray-300"
              />
            </div>

            <div>
              <Label htmlFor="ifscCode">IFSC Code</Label>
              <Input
                id="ifscCode"
                value={formData.ifscCode}
                onChange={e => handleInputChange("ifscCode", e.target.value)}
                className="bg-gray-50 border border-gray-300"
              />
            </div>
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button
              type="button" className="bg-gray-50 border border-gray-300 hover:bg-gray-400"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" className="bg-gray-600 hover:bg-gray-700 text-white">
              Save Changes
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default EditSellerDialog
