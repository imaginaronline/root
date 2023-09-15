
import { FormEvent, useState } from "react";
import { Form } from 'semantic-ui-react';
import 'react-image-crop/dist/ReactCrop.css';
import 'react-toastify/dist/ReactToastify.css';
import useAuthStore from "../../../store/authStore";
import proxyApi from "../../../services/proxy";
import { API_ENDPOINTS } from "../../../services/apiConstants";


interface userProfileProps {
    profileReturnResp: (resp:any)=>void; // Replace 'User' with your actual user type
}

function EditProfileComponent({profileReturnResp }: userProfileProps) {
    const accessToken = useAuthStore((state) => state.accessToken); // Get the accessToken from the store
    const _proxy = new proxyApi(accessToken);
    const [photoFile, setPhotoFile] = useState<File | null>(null);
    const [errorMsg, setErrorMsg] = useState(false);


    const handleFile = (e: any) => {
        setErrorMsg(false);
        setPhotoFile(e.target.files[0]);
    };

    const handleSubmit = (e: FormEvent) => {

        e.preventDefault();
        if (photoFile) {
            const formData = new FormData();
            formData.append('imageContent', photoFile,photoFile.name);
            _proxy.post(`${API_ENDPOINTS.setProfilePhoto}?Type=2`, formData).then((resp: any) => {
                if (resp.status) {
                    setPhotoFile(null);
                    profileReturnResp("Profile pic");
                }
                else {
                    profileReturnResp("error");
                }
            }).catch((error: any) => {
                 console.log(error);
            });
        }
        else {
            setErrorMsg(true);
        }
    };

    return (
        <div>
            <div className="uploadImgCard">
                <div>
                    <h4>Upload Profile
                    </h4>
                </div>
                <Form onSubmit={handleSubmit}>
                    <div className="uploadProfileForm">
                        <input
                            className="uploadInput"
                            type="file"
                            id="profile_pic"
                            accept="image/*"
                            onChange={handleFile}
                        />
                        {errorMsg && (<p className="error_message">Please upload the image</p>)}
                        <button className="uploadButton" type="submit">Upload</button>
                    </div>
                </Form>
            </div>
        </div>
    );
}

export default EditProfileComponent;