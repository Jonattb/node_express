module.exports = {
    name: "required|string",
    fullName: "required|string",
    isCompany: "required|boolean",
    email: "required|email|email_available",
    password: "required|string|min:8",
}