class Exception extends Error {
  constructor(message) {
    // Class create to register logs, etc.
    super(message);
  }
}

module.exports = Exception;
