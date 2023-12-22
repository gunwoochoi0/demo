export const puzzleLogic = (data, key) => {
    return data.split('').reduce((acc, char, index) => {
        const code = char.charCodeAt(0) ^ (key.charCodeAt(index % key.length));
        return acc + String.fromCharCode(code);
    }, '');
};