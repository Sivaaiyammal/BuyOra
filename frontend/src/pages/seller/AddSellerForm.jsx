// import React, { useState } from "react"
// import { useEffect } from "react"
import React, { useState, useEffect, useRef } from "react"
import axios from "axios"
import { Pencil, CheckCircle, CompassIcon } from "lucide-react"
import CreatableSelect from "react-select/creatable";
import { ArrowLeft, Upload, Edit, Trash2, Eye } from "lucide-react"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"

const AddSellerForm = () => {
  const [formData, setFormData] = useState({
    sellerName: "",
    companyName: "",
    email: "",
    brandName: "",
    mobileNumber: "",
    address: "",
    pinCode: "",
    gstNumber: "",
    website: "",
    bankName: "",
    accountNumber: "",
    ifscCode: "",
    productCategories: [],
    identityProof: "",
    addressProof: "",
    gstProof: "",
    brandImage: "",
    identityVerification: "",
  })

  const [categories, setCategories] = useState([]);
  const [identityFile, setIdentityFile] = useState(null);
  const [addressFile, setAddressFile] = useState(null);
  const [gstFile, setGstFile] = useState(null);
  const fileInputRef = useRef(null);
  const [brandImage, setBrandImage] = useState(null);
  const brandImageRef = useRef();

 const handleBrandDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      brandImageRef.current.files = e.dataTransfer.files;
      setBrandImage(URL.createObjectURL(file));
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleViewImage = () => {
    if (brandImage) {
      const newWindow = window.open();
      newWindow.document.write(`<img src="${brandImage}" alt="Brand Image" style="max-width:100%"/>`);
    }
  };

  const handleViewIdentityProof = () => {
    if (identityFile) {
      const fileURL = URL.createObjectURL(identityFile);
      window.open(fileURL, '_blank');
    }
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/categories");
        setCategories(
          res.data.map((cat) => ({
            value: cat._id,
            label: cat.name,
          }))
        );
      } catch (err) {
        console.error("Failed to fetch categories:", err);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchSellerId = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/sellers/next-id");
        setFormData((prev) => ({ ...prev, sellerId: res.data.sellerId }));
      } catch (err) {
        console.error("Failed to fetch seller ID:", err);
      }
    };

    fetchSellerId();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const { id, files } = e.target;
    if (!files.length) return;

    switch (id) {
      case "identityProof":
        setIdentityFile(files[0]);
        break;
      case "addressProof":
        setAddressFile(files[0]);
        break;
      case "gstProof":
        setGstFile(files[0]);
        break;
      default:
        break;
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const uploadFile = async (file) => {
    const data = new FormData();
    data.append("image", file);
    const res = await axios.post("http://localhost:5000/api/upload/product-image", data);
    return res.data.imageUrl;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const identityUrl = identityFile ? await uploadFile(identityFile) : "";
      const addressUrl = addressFile ? await uploadFile(addressFile) : "";
      const gstUrl = gstFile ? await uploadFile(gstFile) : "";
      const brandUrl = brandImageRef.current?.files[0]
        ? await uploadFile(brandImageRef.current.files[0])
        : "";

      const sellerPayload = {
        ...formData,
        identityProof: identityUrl,
        addressProof: addressUrl,
        gstProof: gstUrl,
        brandImage: brandUrl,
      };

      await axios.post("http://localhost:5000/api/sellers", sellerPayload);
      alert("Seller added successfully!");

      setFormData({
        sellerId: "",
        sellerName: "",
        companyName: "",
        brandName: "",
        email: "",
        mobileNumber: "",
        identityVerification: "",
        gstNumber: "",
        website: "",
        address: "",
        pinCode: "",
        bankName: "",
        accountNumber: "",
        ifscCode: "",
        productCategories: [],
        identityProof: "",
        addressProof: "",
        gstProof: "",
        brandImage: "",
      });

      setIdentityFile(null);
      setAddressFile(null);
      setGstFile(null);
      setBrandImage(null);

      const res = await axios.get("http://localhost:5000/api/sellers/next-id");
      setFormData((prev) => ({ ...prev, sellerId: res.data.sellerId }));
    } catch (err) {
      console.error("Failed to add seller:", err);
      alert("Failed to add seller.");
    }
  };

  const CustomOption = (props) => {
    const { data, innerRef, innerProps } = props;

    const handleEdit = async (e) => {
      e.stopPropagation();
      const newName = prompt("Edit productCategories name:", data.label);
      if (!newName) return;
      const slug = newName.toLowerCase().replace(/\s+/g, "-");
      try {
        await axios.put(`http://localhost:5000/api/categories/${data.value}`, {
          name: newName,
          slug,
        });
        setCategories((prev) =>
          prev.map((cat) => (cat.value === data.value ? { ...cat, label: newName } : cat))
        );
      } catch (err) {
        console.error("Update failed:", err);
      }
    };

    const handleDelete = async (e) => {
      e.stopPropagation();
      if (!window.confirm(`Delete ${data.label}?`)) return;
      try {
        await axios.delete(`http://localhost:5000/api/categories/${data.value}`);
        setCategories((prev) => prev.filter((cat) => cat.value !== data.value));
        setFormData((prev) => ({
          ...prev,
          productCategories: prev.productCategories.filter((id) => id !== data.value)
        }));
      } catch (err) {
        console.error("Delete failed:", err);
      }
    };

    return (
      <div
        ref={innerRef}
        {...innerProps}
        className="flex justify-between items-center px-3 py-2 hover:bg-gray-100 text-sm"
      >
        <span>{data.label}</span>
        <div className="flex gap-2">
          <button type="button" onClick={handleEdit} className="text-blue-600 hover:text-blue-800">
            <Pencil size={14} />
          </button>
          <button type="button" onClick={handleDelete} className="text-red-600 hover:text-red-800">
            <Trash2 size={14} />
          </button>
        </div>
      </div>
    );
  };


  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="border-b border-gray-200 p-6">
        <div className="flex items-center space-x-3">
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <ArrowLeft className="h-5 w-5 text-gray-600" />
          </button>
          <h2 className="text-lg font-semibold text-gray-900">
            Add Seller <span className="text-gray-500">(Basic Details)</span>
          </h2>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="p-6">
        <div className="mb-6">
          <h2 className="text-lg font-medium text-gray-900 mb-1">
            Seller ID :- {formData.sellerId || "Loading..."}
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {[
              { label: "Seller Name", name: "sellerName" },
              { label: "Company Name", name: "companyName" },
              { label: "Brand Name", name: "brandName" },
              { label: "E-Mail ID", name: "email", type: "email" },
              // { label: "Mobile Number", name: "mobileNumber", type: "tel" },
            ].map((field) => (
              <div key={field.name}>
                <label className="block text-sm font-medium text-gray-700 mb-1">{field.label}<span className="text-red-500">*</span></label>
                <input
                  type={field.type || "text"}
                  name={field.name}
                  value={formData[field.name]}
                  disabled={field.disabled}
                  onChange={handleInputChange}
                  placeholder={field.placeholder || ""}
                  className={`w-full px-3 py-2 ${field.disabled ? "bg-gray-100" : ""
                    } border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                />
              </div>
            ))}
        </div>

        

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label
              className="text-sm font-medium text-gray-700 mb-2 block"
            >
              Mobile Number<span className="text-red-500">*</span>
            </label>
            
            <input
              id="mobileNumber"
              name="mobileNumber"
              
              // placeholder="Government ID (Aadhaar, PAN, Passport)"
              value={formData.mobileNumber}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
              <div >
                <label
                  className="text-sm font-medium text-gray-700 mt-5 mb-2 block"
                >
                  Identity Verification
                </label>
                
                <input
                  id="identityVerification"
                  name="identityVerification"
                  
                  placeholder="Government ID (Aadhaar, PAN, Passport)"
                  value={formData.identityVerification}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">Address<span className="text-red-500">*</span></label>
            <textarea
              name="address"
              rows={4}
              value={formData.address}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            ></textarea>
            
          </div>

          

          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">
              GST Number <span className="text-red-500">*</span>
            </label>
            <input
              id="gstNumber"
              name="gstNumber"
              value={formData.gstNumber}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

         <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">Pin Code<span className="text-red-500">*</span></label>
            <input
              type="text"
              name="pinCode"
              value={formData.pinCode}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">
              Website
            </label>
            <Input
              id="website"
              name="website"
              value={formData.website}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <Label
              htmlFor="brandImage"
              className="text-sm font-medium text-gray-700 mb-2 block"
            >
              Brand Image
              <div className="flex space-x-2 ml-auto">
                <button
                  type="button"
                  className="text-gray-400 hover:text-gray-600"
                  onClick={() => brandImageRef.current?.click()}
                >
                  <Edit className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  className="text-gray-400 hover:text-gray-600"
                  onClick={handleViewImage}
                  disabled={!brandImage}
                >
                  <Eye className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  className="text-gray-400 hover:text-gray-600"
                  onClick={() => setBrandImage(null)}
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </Label>
            <input
              type="file"
              id="brandImage"
              ref={brandImageRef}
              className="hidden"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  setBrandImage(URL.createObjectURL(file));
                }
              }}
            />
            <div 
              className="border-2 border-dashed border-orange-300 rounded-lg p-8 text-center bg-orange-50" 
            >

              {brandImage ? (
                <img
                  src={brandImage}
                  alt="Brand Logo"
                  className="mx-auto"
                  style={{ width: '400px', height: '100px', objectFit: 'contain' }}
                />
              ) : (
                <>
                <label htmlFor="brandImage" onDrop={handleBrandDrop} 
              onDragOver={handleDragOver} 
              onClick={() => brandImageRef.current?.click()}>
                  <Upload className="h-8 w-8 text-orange-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">
                    Drop Your Images Here, Or Click To Browse
                  </p>
              </label>
              </>
              )}
            </div>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Payment Details
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {["bankName", "accountNumber", "ifscCode"].map((name) => (
                <div key={name}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {name === "ifscCode"
                      ? "IFSC Code"
                      : name === "bankName"
                        ? "Bank Name"
                        : "Account Number"}<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name={name}
                    value={formData[name]}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              ))}
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Product Categories<span className="text-red-500">*</span></label>
          <CreatableSelect
              isClearable
              placeholder="Choose or create a productCategories"
              isMulti
              value={categories.filter((cat) => formData.productCategories.includes(cat.value))}
              onChange={(selectedOptions) => {
                setFormData((prev) => ({
                  ...prev,
                  productCategories: selectedOptions ? selectedOptions.map((opt) => opt.value) : [],
                }));
              }}
              onCreateOption={async (inputValue) => {
                const slug = inputValue.toLowerCase().replace(/\s+/g, "-");
                try {
                  const res = await axios.post("http://localhost:5000/api/categories/create", {
                    name: inputValue,
                    slug,
                  });
                  const newCat = { value: res.data._id, label: res.data.name };
                  setCategories((prev) => [...prev, newCat]);
                  setFormData((prev) => ({
                    ...prev,
                    productCategories: [...prev.productCategories, newCat.value],
                  }));
                } catch (err) {
                  console.error("Failed to create productCategories:", err);
                  alert("Failed to create productCategories.");
                }
              }}

              options={categories}
              components={{ Option: CustomOption }}
              className="react-select-container"
              classNamePrefix="react-select"
            />
        </div>

        <div className="mb-8">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Documents Section
          </h3>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div>
                <h4 className="font-medium text-gray-900 mb-3">
                  Identity Proof<span className="text-red-500">*</span>
                </h4>
                <div className="space-y-2">
                  <input
                    type="file"
                    id="identityProof"
                    accept="image/*,.pdf"
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                  <Button type="button" onClick={() => document.getElementById("identityProof").click()} className="w-full border border-gray-400" >Upload
                  </Button>
                  {identityFile && (
                    <span className="inline-flex items-center text-green-600 text-sm">
                      <CheckCircle className="mr-1" size={16} /> Uploaded
                    </span>
                  )}
                  <Button type="button" variant="outline" size="sm" className="w-full border border-gray-400" onClick={handleViewIdentityProof}>
                    View
                  </Button>
                </div>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-3">
                  Address Proof<span className="text-red-500">*</span>
                </h4>
                <div className="space-y-2">
                  <input
                    type="file"
                    id="addressProof"
                    accept="image/*,.pdf"
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                  <Button type="button" onClick={() => document.getElementById("addressProof").click()} className="w-full border border-gray-400" >
                    Upload
                  </Button>
                  {addressFile && (
                    <span className="inline-flex items-center text-green-600 text-sm">
                      <CheckCircle className="mr-1" size={16} /> Uploaded
                    </span>
                  )}
                  <Button type="button" variant="outline" size="sm" className="w-full border border-gray-400" onClick={handleViewIdentityProof}>
                    View
                  </Button>
                </div>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-3">
                  GST Proof<span className="text-red-500">*</span>
                </h4>
                <div className="space-y-2">
                  <input
                    type="file"
                    id="gstProof"
                    accept="image/*,.pdf"
                    className="hidden"
                    onChange={(e) => setGstFile(e.target.files[0])}
                  />
                  <Button type="button" onClick={() => document.getElementById("gstProof").click()} className="w-full border border-gray-400">
                    Upload
                  </Button>
                  {gstFile && (
                    <span className="inline-flex items-center text-green-600 text-sm">
                      <CheckCircle className="mr-1" size={16} /> Uploaded
                    </span>
                  )}
                  <Button type="button" variant="outline" size="sm" className="w-full border border-gray-400" onClick={handleViewIdentityProof}>
                    View
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-2 pt-4">
          <Button type="button" variant="outline" className="bg-gray-50 border border-gray-300 hover:bg-gray-400" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button type="submit" className="px-8 bg-gray-600 hover:bg-gray-700 text-white">
            Save
          </Button>
        </div>
      </form>
    </div>
  )
}

export default AddSellerForm
