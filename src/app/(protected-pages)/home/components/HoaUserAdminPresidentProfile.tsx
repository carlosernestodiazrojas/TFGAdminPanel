import { UserResponse } from "@/@types/hoa";

const HoaUserPlaceholder = () => {
    return (
        <div className="bg-white rounded-lg shadow-lg p-6 mx-auto border border-primary/20 animate-pulse">
            <div className="flex flex-col items-center">

                <div className="mb-4">
                    <div className="w-24 h-24 rounded-full bg-gray-200 border-4 border-primary/20"></div>
                </div>

                <div className="text-center space-y-2 w-full">
                    <div className="h-8 bg-gray-200 rounded mx-auto w-48"></div>
                    <div className="h-5 bg-gray-200 rounded mx-auto w-56"></div>
                    <div className="h-7 bg-gray-200 rounded-full mx-auto w-24 mt-3"></div>
                </div>
            </div>
        </div>
    );
};

const HoaUserAdminPresidentProfile = ({ user, isLoading }: { user: UserResponse; isLoading: boolean }) => {


    if (isLoading || !user) {
        return <HoaUserPlaceholder />;
    }

    const fullName = `${user.name} ${user.last_name}`;
    const profileImage = user.imagesUrls[0];

    return (
        <div className="bg-white rounded-lg shadow-lg p-6 mx-auto border border-primary/20">
            <div className="flex flex-col items-center">

                <div className="mb-4">
                    {profileImage ? (
                        <img
                            src={profileImage}
                            alt={`Foto de perfil de ${fullName}`}
                            className="w-24 h-24 rounded-full object-cover border-4 border-primary/20"
                        />
                    ) : (
                        <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center border-4 border-primary/20">
                            <svg className="w-12 h-12 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                            </svg>
                        </div>
                    )}
                </div>

                <div className="text-center space-y-2">
                    <h2 className="text-2xl font-bold text-gray-800">{fullName}</h2>
                    <p className="text-gray-600">{user.email}</p>
                    <span className="inline-block bg-primary text-white text-sm font-medium px-3 py-1 rounded-full">
                        {user.role.name}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default HoaUserAdminPresidentProfile