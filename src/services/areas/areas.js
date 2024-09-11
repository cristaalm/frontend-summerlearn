import { Baseurl } from "@/../global";

export const getAreas = async () => {
    const response = await fetch(`${Baseurl}areas/`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    });
    const json = await response.json();
    const areas = json;

    return areas?.map(area => ({
        id: area.areas_id,
        name: area.areas_name,
        status: area.areas_status,
    }));
}
