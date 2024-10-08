import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { router } from "@inertiajs/react";
import React from "react";

interface BreadcrumbItemType {
    label: string;
    href: string | URL;
}

interface MyHeaderProps {
    title: string;
    breadcrumbItems: BreadcrumbItemType[];
    right: React.ReactElement;
}

const MyHeader: React.FC<MyHeaderProps> = ({
    title,
    breadcrumbItems,
    right,
}) => {
    return (
        <div className="py-10 overflow-y-hidden">
            <div className="w-full mx-auto">
                <div className="border-b overflow-hidden">
                    <div className="p-6 text-gray-900">
                        <div className="flex flex-row justify-between items-center">
                            {/* Breadcrumb Component */}
                            <Breadcrumb>
                                <BreadcrumbList>
                                    {breadcrumbItems.map((item, index) => (
                                        <React.Fragment key={index}>
                                            <BreadcrumbItem>
                                                {item.href ? (
                                                    <BreadcrumbLink
                                                        // href={item.href}
                                                        className="cursor-pointer"
                                                        onClick={() => {
                                                            router.get(
                                                                item.href
                                                            );
                                                        }}
                                                    >
                                                        {item.label}
                                                    </BreadcrumbLink>
                                                ) : (
                                                    <BreadcrumbPage>
                                                        {item.label}
                                                    </BreadcrumbPage>
                                                )}
                                            </BreadcrumbItem>
                                            {index <
                                                breadcrumbItems.length - 1 && (
                                                <BreadcrumbSeparator />
                                            )}
                                        </React.Fragment>
                                    ))}
                                </BreadcrumbList>
                            </Breadcrumb>

                            {right}
                            {/* Header Title */}
                            {/* <span className="font-bold text-2xl mt-4">{title}</span> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyHeader;
