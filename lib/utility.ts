import * as fs from 'fs';
interface UserData {
    username: string;
    password: string;
    newPassword: string;
}

export const readCSV = (filepath: string): UserData[] => {
    const data: UserData[] = [];
    const file = fs.readFileSync(filepath, 'utf-8');
    const rows = file.split('\n');
    for (const row of rows) {
        const cells = row.split(',');
        if (cells.length === 3) {
            data.push({
                username: cells[0],
                password: cells[1],
                newPassword: cells[2],
            });
        }
    }
    return data;
};
export const updatePassword = (data: UserData[], filepath: string, username: string, password: string, newPassword: string) => {
    for (const user of data) {
        if (user.username === username) {
            user.password = newPassword;
            user.newPassword = password;
            break;
        }
    }
    const updatedData = data.map(user => `${user.username},${user.password},${user.newPassword}`).join('\n');
    fs.writeFileSync(filepath, updatedData);
    
};


