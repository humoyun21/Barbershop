import {Flex, Spin} from "antd";
import {Suspense as SuspenseComponent} from "react";

const Loading = () => {
  return (
      <div className="w-full h-screen flex justify-center items-center">
      <Flex align="center" gap="middle">
        <Spin tip="Loading..." size="large" />
      </Flex>
      </div>
)
}

const Suspense = ({children} : {children : JSX.Element}) => {
  return (
      <SuspenseComponent fallback={<Loading/>}>
        {children}
    </SuspenseComponent>
    )
}

const Container = ({children} : {children : JSX.Element}) => {
  return (
      <div className="max-w-[1400px] mx-auto px-6">
        {children}
    </div>
    )
}

export {Loading, Suspense, Container}