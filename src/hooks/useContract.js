import { api } from "../api";
import { useClient } from "./useClient";

export const useContract = (setLoading, setError) => {
    const client = useClient()

    const newContract = () => {
        const formData = new FormData();
        const data = { ...client.value, ...client.value?.form };
        delete data.form;

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

        api.post('/contract/new', formData)
        .then(response => {
            const data = response.data
            console.log(data)
            if (data.error) setError(data.error)
        })
        .catch(error => console.error(error))
        .finally(() => setLoading(false))
    }
}