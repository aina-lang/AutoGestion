import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { router } from '@inertiajs/react';
import React from 'react';

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
        <div className="overflow-y-hidden py-0  ">
            <div className="mx-auto w-full">
                <div className="overflow-hidden">
                    <div className="p-6 text-gray-900 border-b ">
                        <div className="flex flex-row items-center justify-between">
                            {/* Breadcrumb Component */}
                            <Breadcrumb>
                                <BreadcrumbList className="flex items-center space-x-2">
                                    {breadcrumbItems.map((item, index) => (
                                        <React.Fragment key={index}>
                                            <BreadcrumbItem>
                                                {item.href ? (
                                                    <BreadcrumbLink
                                                        className="cursor-pointer text-blue-600 hover:underline"
                                                        onClick={() => {
                                                            router.get(item.href);
                                                        }}
                                                    >
                                                        {item.label}
                                                    </BreadcrumbLink>
                                                ) : (
                                                    <BreadcrumbPage className="font-semibold">
                                                        {item.label}
                                                    </BreadcrumbPage>
                                                )}
                                            </BreadcrumbItem>
                                            {index < breadcrumbItems.length - 1 && (
                                                <BreadcrumbSeparator className="text-gray-400">/</BreadcrumbSeparator>
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
