export default function checkExpiration(expirationDate) {
    const now = new Date();
    const parts = expirationDate.split(/[- :]/); 
    const expDate = new Date(Date.UTC(parts[0], parts[2] - 1, parts[1], parts[3], parts[4], parts[5]));
    return now > expDate ? "Hết hạn" : "Đang hoạt động";
}