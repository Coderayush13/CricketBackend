const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// POST: Save a phone number
router.post('/numbers', async (req, res) => {
  const { phoneNumber } = req.body;

  // Validate 10-digit phone number
  if (!/^\d{10}$/.test(phoneNumber)) {
    return res.status(400).json({ message: 'Phone number must be exactly 10 digits' });
  }

  try {
    // Check if number already exists

    // Save the new phone number
    const newNumber = await prisma.phoneNumber.create({
      data: { number: phoneNumber },
    });

    res.status(201).json({ message: 'Phone number saved', data: newNumber });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Server error', error });
  } finally {
    await prisma.$disconnect(); // Close the connection
  }
});

// GET: Retrieve all phone numbers (optional)
router.get('/numbers', async (req, res) => {
  try {
    const numbers = await prisma.phoneNumber.findMany();
    res.json(numbers);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Server error', error });
  } finally {
    await prisma.$disconnect();
  }
});

module.exports = router;