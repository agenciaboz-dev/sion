import { api } from "../api";
import { useClient } from "./useClient";
import { useUser } from "./useUser";

export const useContract = (setLoading, setError) => {
    const client = useClient()
    const [user, setUser] = useUser()

    const contract = {
        generate: (callback, _finally) => {
            const formData = new FormData();
            const data = { unit: client.value.unit };

            formData.append("data", JSON.stringify(data));

            // Assuming you have the files in the `attachments` state
            const attachments = client.value.anexos;
            if (attachments) {
                Object.entries(attachments).forEach(([key, files]) => {
                files.forEach((file, index) => {
                    formData.append(`${key}_${index}`, file);
                    });
                });
            }
            api.post('/contract/generate', formData)
            .then(response => callback(response))
            .catch(error => console.error(error))
            .finally(() => _finally())
        },
        
        lead: () => {
            const data = {...client?.value, ...client?.value?.form, seller: {id: user.id, name: user.name}}
            api.post('/contract/lead', data)
            .then(response => {if (response.data) client.setValue(response.data)})
            .catch(error => console.error(error))
        }
    }

    return contract
}