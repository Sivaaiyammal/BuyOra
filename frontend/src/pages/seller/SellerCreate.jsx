import { useState, useEffect } from "react";
import axios from "axios";
import CreatableSelect from "react-select/creatable";
import { Pencil, Trash2 } from "lucide-react";

const SellerCreate = () => {
  const [formData, setFormData] = useState({
    sellerId: "",
    sellerName: "",
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
    productCategories: [], // renamed for consistency with `react-select`
  });

  const [categories, setCategories] = useState([]);

  // Fetch product categories
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

  // Fetch the next seller ID
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/sellers", formData);
      alert("Seller added successfully!");

      // Reset form
      setFormData({
        sellerId: "",
        sellerName: "",
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
      });

      // Submit success
      setFormData((prev) => ({
        ...prev,
        sellerName: "",
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
      }));

      // Fetch new seller ID
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
        if (formData.productCategories.includes(data.value)) {
          setFormData((prev) => ({ ...prev, productCategories: "" }));
        }
      } catch (err) {
        console.error("Delete failed:", err);
      }
    };

    const handleImageUpload = async e => {
        const files = e.target.files
        if (!files || files.length === 0) return
    
        const formDataImg = new FormData()
        formDataImg.append("image", files[0])
    
        try {
          const response = await axios.post(
            "http://localhost:5000/api/upload/product-image",
            formDataImg,
            {
              headers: { "Content-Type": "multipart/form-data" }
            }
          )
    
          const imageUrl = response.data.imageUrl
          setFormData(prev => ({ ...prev, images: [...prev.images, imageUrl] }))
          setUpdatedImages(prev => [...prev, imageUrl])
        } catch (err) {
          console.error("Upload failed:", err)
          alert("Image upload failed")
        }
      }

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
    <div className="bg-white rounded-lg shadow">
      <div className="p-6">
        <h2 className="text-lg font-medium mb-6">Add Seller (Basic Details)</h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Seller Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { label: "Seller ID", name: "sellerId", disabled: true },
              { label: "Seller Name", name: "sellerName" },
              { label: "Brand Name", name: "brandName" },
              { label: "E-Mail ID", name: "email", type: "email" },
              { label: "Mobile Number", name: "mobileNumber", type: "tel" },
              {
                label: "Identity Verification",
                name: "identityVerification",
                placeholder: "Government ID (Aadhaar, PAN, Passport.)",
              },
              { label: "GST Number", name: "gstNumber" },
              { label: "Website", name: "website", type: "url" },
            ].map((field) => (
              <div key={field.name}>
                <label className="block text-sm font-medium text-gray-700 mb-1">{field.label}</label>
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

          {/* Address */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
            <textarea
              name="address"
              rows={4}
              value={formData.address}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            ></textarea>
          </div>

          {/* Pin Code */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Pin Code</label>
            <input
              type="text"
              name="pinCode"
              value={formData.pinCode}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Product productCategories */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">productCategories</label>
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

          {/* Payment Details */}
          <div>
            <h3 className="text-lg font-medium mb-4">Payment Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {["bankName", "accountNumber", "ifscCode"].map((name) => (
                <div key={name}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {name === "ifscCode"
                      ? "IFSC Code"
                      : name === "bankName"
                        ? "Bank Name"
                        : "Account Number"}
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

          {/* Action Buttons */}
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              className="px-6 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SellerCreate;
