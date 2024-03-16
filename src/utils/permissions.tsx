import * as Contacts from 'expo-contacts';
import { PermissionStatus } from 'expo-modules-core';

const getContactsPermissionsState = async (): Promise<boolean> => {
    const { status } = await Contacts.getPermissionsAsync();
    if (status === Contacts.PermissionStatus.UNDETERMINED || status === Contacts.PermissionStatus.DENIED) {
        return false;
    }
    return true;
};

export { getContactsPermissionsState };
