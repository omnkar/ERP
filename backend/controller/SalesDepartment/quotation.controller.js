const Quotation = require("../../models/SalesDepartment/quotation.model");

module.exports.getAllQuotations = async (req, res) => {
  try {
    const quotations = await Quotation.find();
    res.status(200).json(quotations);
  } catch (error) {
    console.error("Error fetching quotations:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports.getQuotationById = async (req, res) => {
  try {
    const { id } = req.params;
    const quotation = await Quotation.findById(id);
    if (!quotation) {
      return res.status(404).json({ error: "Quotation not found" });
    }
    res.status(200).json(quotation);
  } catch (error) {
    console.error("Error fetching quotation:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports.createQuotation = async (req, res) => {
  try {
    console.log(req.body);
    const newQuotation = new Quotation(req.body);
    await newQuotation.save();
    res.status(201).json({ message: "Quotation created successfully!", quotation: newQuotation });
  } catch (error) {
    console.error("Error creating quotation:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports.updateQuotation = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedQuotation = await Quotation.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedQuotation) {
      return res.status(404).json({ error: "Quotation not found" });
    }
    res.status(200).json({ message: "Quotation updated successfully!", quotation: updatedQuotation });
  } catch (error) {
    console.error("Error updating quotation:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports.deleteQuotation = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedQuotation = await Quotation.findByIdAndDelete(id);
    if (!deletedQuotation) {
      return res.status(404).json({ error: "Quotation not found" });
    }
    res.status(200).json({ message: "Quotation deleted successfully!" });
  } catch (error) {
    console.error("Error deleting quotation:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
