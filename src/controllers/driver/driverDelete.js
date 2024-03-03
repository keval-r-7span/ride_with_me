const verifyJWT = require('../../middleware/authMiddleware'); 

const deleteDriver = async (req, res) => {
  try {
    // Middleware check for valid JWT
    verifyJWT(req, res, async () => {
      const driverId = req.params.id;

      const deletedDriver = await Driver.findByIdAndDelete(driverId);
      if (!deletedDriver) {
        return res.status(404).json({ message: 'Driver not found' });
      }

      res.status(200).json({ message: 'Driver deleted successfully' });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'error while deleting driver' });
  }
};

module.exports = deleteDriver;
