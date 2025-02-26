import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, IconButton, MD3Colors, Text } from 'react-native-paper';
import { usePathname, useRouter } from 'expo-router';

const Header = ({ title, showBack = true}: { title: string, showBack?: boolean }) => {
    const router = useRouter();
    const pathname = usePathname();

    const handleBack = () => {
        console.log({ router: pathname });

        if (pathname !== '/login' && pathname !== '/signup') {
            router.back();
        } else {
            router.replace('/home');
        }
    };

    return (
        <View style={styles.header}>
            {pathname !== '/login' && pathname !== '/signup' && (
                <IconButton
                    icon="arrow-left"
                    size={25}
                    onPress={handleBack}
                    style={styles.backButton}
                />
            )}
            <Text style={[styles.title, {
                marginLeft: showBack ? 30 : 5
            }]} numberOfLines={1}>{title}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 10,
        paddingHorizontal: 20,
        height: 60,
    },
    backButton: {
        left: 0,
        top: 8,
        position: 'absolute',
    },
    title: {
        color: 'black',
        fontSize: 30,
        fontWeight: 'bold',
        flex: 1,
        textAlign: 'left',
    },
});

export default Header;
