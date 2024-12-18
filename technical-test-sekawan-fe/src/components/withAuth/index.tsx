"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

const withAuth = (WrappedComponent: any, allowedRoles: string[]) => {
  return (props: any) => {
    const router = useRouter();

    useEffect(() => {
      const token = localStorage.getItem("token");
      const role = localStorage.getItem("role");

      if (!token || !allowedRoles.includes(role || "")) {
        if (role === 'Super Admin') {
          router.push('/super-admin/dashboard');
        } else if (role === 'Admin') {
          router.push('/admin/dashboard');
        } else if (role === 'Manager') {
          router.push('/manager/dashboard');
        } else if (role === 'Pegawai') {
          router.push('/pegawai/dashboard');
        } else {
          router.push('/login');
        }
      }
    }, [router]);

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;