const Quotation = require("../models/Quotation");

module.exports.createQuotation = async (req, res) => {
  try {
    const newQuotation = new Quotation(req.body);
    await newQuotation.save();
    res.status(201).json({ message: "Quotation created successfully", quotation: newQuotation });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.getQuotations = async (req, res) => {
  try {
    const quotations = await Quotation.find().populate("customerId");
    res.json(quotations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.updateQuotation = async (req, res) => {
  try {
    const updatedQuotation = await Quotation.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedQuotation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports.deleteQuotation = async (req, res) => {
  try {
    await Quotation.findByIdAndDelete(req.params.id);
    res.json({ message: "Quotation deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
