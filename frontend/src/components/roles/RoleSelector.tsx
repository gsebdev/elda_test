import type { Role } from "../../types/Role";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

interface RoleSelectorProps {
    roles: Role[] | undefined;
    selected?: number | null;
    onChange: (v: number) => void
}

export default function RoleSelector({ roles, selected, onChange }: RoleSelectorProps) {
    const handleChange = (v: string) => {
        if(v === '') return null;
        const val = parseInt(v);
        if (!isNaN(val)) onChange(val)
    };

    if(!roles || roles.length === 0) return null;

    return (
        <Select
            onValueChange={handleChange}
            value={selected === null ? '' : selected?.toString()}>
            <SelectTrigger className="w-full max-w-48">
                <SelectValue placeholder="Sélectionner un poste" />
            </SelectTrigger>
            <SelectContent className="max-h-75">
                <SelectGroup>
                    {roles && roles.map(role => (
                        <SelectItem key={role.id} value={role.id.toString()} >
                            {role.name}
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}
