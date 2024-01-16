import React, { useState } from 'react';
import image1 from "../assets/user1-avatar.jpg";
import image2 from "../assets/user2-avatar.jpg";
import image3 from "../assets/user3-avatar.jpg";
import image4 from "../assets/user4-avatar.png";
import image5 from "../assets/user5-avatar.png";
import image6 from "../assets/user6-avatar.png";

interface User {
    avatar: string;
    email: string;
    name: string;
}

const userList: User[] = [
    {
        avatar: image1,
        email: "user1@email.com",
        name: "User One",
    },
    {
        avatar: image2,
        email: "user2@email.com",
        name: "User Two",
    },
    {
        avatar: image3,
        email: "user3@email.com",
        name: "User Three",
    },
    {
        avatar: image4,
        email: "user4@email.com",
        name: "User Four",
    },
    {
        avatar: image5,
        email: "user5@email.com",
        name: "User Five",
    },
    {
        avatar: image6,
        email: "user6@email.com",
        name: "User Six",
    },
];

const SearchComponent: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [selectedUsers, setSelectedUsers] = useState<User[]>([]);

    const filteredUsers = userList.filter((user) => {
        const searchTermLower = searchTerm.toLowerCase();
        return (
            user.name.toLowerCase().includes(searchTermLower) ||
            user.email.toLowerCase().includes(searchTermLower)
        );
    });

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const handleUserClick = (user: User) => {
        setSelectedUsers((prevSelectedUsers) => [...prevSelectedUsers, user]);
        setSearchTerm('');
    };

    const handleRemoveUser = (user: User) => {
        setSelectedUsers((prevSelectedUsers) =>
            prevSelectedUsers.filter((selectedUser) => selectedUser !== user)
        );
    };

    return (
        <div className="container mx-auto p-4 flex flex-col items-center">
            <div className="mb-4">
                <h2 className="text-2xl font-bold mb-2">Pick User</h2>
                <ul className="flex flex-wrap justify-center">
                    {selectedUsers.map((user) => (
                        <li
                            key={user.email}
                            className="bg-gray-200 p-2 rounded-md m-2 flex items-center"
                        >
                            <img
                                src={user.avatar}
                                alt={user.name}
                                className="w-8 h-8 rounded-full mr-2"
                            />
                            <span>
                                {user.name} ({user.email})
                            </span>
                            <button
                                className="bg-red-500 text-white p-2 rounded-full ml-auto"
                                onClick={() => handleRemoveUser(user)}
                            >
                                X
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="fixed top-1/2 transform -translate-y-1/2">
                <input
                    type="text"
                    placeholder="Search by name or email..."
                    value={searchTerm}
                    onChange={handleInputChange}
                    className="w-full p-2 mb-4 border border-gray-300 rounded-md"
                />
                <ul className="flex flex-wrap justify-center">
                    {filteredUsers
                        .filter((user) => !selectedUsers.includes(user))
                        .map((user) => (
                            <li
                                key={user.email}
                                className="bg-white p-2 rounded-md m-2 cursor-pointer flex items-center"
                                onClick={() => handleUserClick(user)}
                            >
                                <img
                                    src={user.avatar}
                                    alt={user.name}
                                    className="w-8 h-8 rounded-full mr-2"
                                />
                                <span>
                                    {user.name} ({user.email})
                                </span>
                            </li>
                        ))}
                </ul>
            </div>
        </div>

    );
};

export default SearchComponent;
