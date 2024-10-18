import React from "react";
import { useTheme } from "@/context/ThemeContext";
import SearchInput from "../ui/SearchInput";
import AuthorizationCard from "./AuthorizationCard";

const AuthorizationList = ({
  authorizations,
  searchTerm,
  onSearchChange,
  onSelect,
  selectedId,
}) => {
  const { theme } = useTheme();

  return (
    <div
      className={`
      rounded-lg shadow-lg
      ${theme === "dark" ? "bg-gray-800" : "bg-white"}
    `}
    >
      <div
        className={`
        p-4 border-b
        ${theme === "dark" ? "border-gray-700" : "border-gray-200"}
      `}
      >
        <h2
          className={`
          text-lg font-semibold mb-4
          ${theme === "dark" ? "text-white" : "text-gray-900"}
        `}
        >
          Authorization Requests
        </h2>
        <SearchInput
          value={searchTerm}
          onChange={onSearchChange}
          placeholder="Search authorizations..."
        />
      </div>
      <div className="p-4 space-y-3">
        {authorizations.map((auth) => (
          <AuthorizationCard
            key={auth.id}
            authorization={auth}
            isSelected={auth.id === selectedId}
            onClick={() => onSelect(auth)}
          />
        ))}
      </div>
    </div>
  );
};

export default AuthorizationList;
