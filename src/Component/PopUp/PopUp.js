import React from 'react';
import { TouchableOpacity, Text, View, Modal, StyleSheet } from 'react-native';

import {MainColor, FontMainColor, FontSecondaryColor, FontThirdColor} from '../../UI/Color';
import {WidthDimen, HeightDimen, fontDimen, GetWidth, GetHeight} from '../../UI/Dimensions';

const PopUp = (props) => {
    const { 
        label,
        onPress,
        toShow
    } = props;


    return (
        <Modal
            animationType = {"slide"}
            transparent={true}
            visible={toShow}
        >
            <View style={styles.container_main}>
                <View style={styles.container_sub}>
                    <Text style={styles.text_title}>Congratulations!</Text>
                    <Text style={styles.text_normal}>{label}</Text>
                    <TouchableOpacity 
                        onPress={onPress}
                        style={{
                            marginTop: HeightDimen(20)
                        }}
                    >
                        <Text style={styles.text_restrt}>Restart</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    container_main: {
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center'
    },
    container_sub: {
        backgroundColor: 'white',
        justifyContent: 'center', 
        alignItems: 'center',
        padding: WidthDimen(15),
        borderRadius: fontDimen(10),
        borderWidth: fontDimen(4)
      
    },
    text_title: {
        fontSize: fontDimen(20),
        color: FontMainColor,
        fontWeight: 'bold'
    },
    text_normal: {
        fontSize: fontDimen(15),
        color: FontMainColor
    },
    text_restrt: {
        fontSize: fontDimen(15),
        color: FontSecondaryColor
    },
    
});

export { PopUp };