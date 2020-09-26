import { Dimensions } from "react-native";

const WidthDimen = (size) => {
    const { width } = Dimensions.get("window");
    const Benchmark = 360;
    return (size / Benchmark) * width;
}

const HeightDimen = (size) => {
    const { height } = Dimensions.get("window");
    const Benchmark = 755;
    return (size / Benchmark) * height;
}

const fontDimen = (size) => {
    const { width, height } = Dimensions.get("window");
    const Benchmark_width = 360;
    const Benchmark_height = 755;
    const scaleWidth = width / Benchmark_width;
    const scaleHeight = height / Benchmark_height;
    const scale = Math.min(scaleWidth, scaleHeight);

    return ( Math.ceil((size * scale)) );

}

const GetWidth = Dimensions.get("window").width;
const GetHeight = Dimensions.get("window").height;

export {WidthDimen, HeightDimen, fontDimen, GetWidth, GetHeight};