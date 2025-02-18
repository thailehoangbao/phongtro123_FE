export const formatText = (input, wordLimit) => {
    // Loại bỏ các dấu câu để dễ dàng đếm từ
    const cleanText = input.replace(/[.,-/•:;()…]/g, '');
    // Tách thành mảng các từ
    const words = cleanText.split(/\s+/);
    // Giới hạn số lượng từ
    const truncatedWords = words.slice(0, wordLimit);
    // Kết hợp lại thành chuỗi
    return truncatedWords.join(' ');
};

