import { Plus } from "lucide-react"
import { useForm } from 'react-hook-form';
import { Button } from "../ui/button"
import { zodResolver } from '@hookform/resolvers/zod';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../ui/dialog"
import { Field, FieldGroup } from "../ui/field"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { useEffect, useRef, useState, type KeyboardEvent } from "react"
import { useCreateRole, useRoles } from "../../hooks/useRoles"
import type { Role } from "../../types/Role"
import createEmployeeSchema, { type EmployeeFormData } from "../../schemas/createEmployeeSchema";
import { useCreateEmployee } from "../../hooks/useEmployees";
import { FormField, FormMessage } from "../ui/form";

function CreateEmployeeForm() {
    const [addRoleActive, setAddRoleActive] = useState<boolean>(false);
    const [dialogOpen, setDialogOpen] = useState<boolean>(false);
    const [newRole, setNewRole] = useState<string>('');
    const roleInputRef = useRef<HTMLInputElement>(null);
    const { data: roles, error: rolesError } = useRoles();
    const createEmployee = useCreateEmployee();
    const createRole = useCreateRole();

    useEffect(() => {
        if (addRoleActive && roleInputRef.current) {
            roleInputRef.current.focus();
        }
    }, [addRoleActive]);

    const {
        register,
        handleSubmit,
        reset,
        control,
        formState: { errors },
        setError,
        setValue,
    } = useForm<EmployeeFormData>({
        resolver: zodResolver(createEmployeeSchema),
    });

    const onSubmit = (data: EmployeeFormData) => {
        createEmployee.mutate(data, {
            onSuccess: () => {
                reset();
                alert('Employé créé avec success');
                setDialogOpen(false);
            },
            onError: (error) => {
                setError('root', {
                    type: 'manual',
                    message: error.message
                })
            }
        });
    };

    const handleRoleInputBlur = () => {
        setAddRoleActive(false);
        setNewRole('');
    }

    const handleRoleInputKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key !== 'Enter') return;

        e.preventDefault();

        const role = newRole.trim();
        if (!role) return;

        createRole.mutate(role, {
            onError: (error) => {
                setError('root', {
                    type: 'manual',
                    message: error.message
                })
            },
            onSuccess: (data) => {
                console.log(data.id)
                setValue('roleId', data.id);
                setNewRole('');
                setAddRoleActive(false);
            }
        });
    }

    return (
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
                <Button>
                    <Plus />
                    Nouvel Employé
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-sm">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <DialogHeader>
                        <DialogTitle>Créer un employé</DialogTitle>
                    </DialogHeader>
                    <FieldGroup>
                        <Field>
                            <Label htmlFor="firstName">Prénom</Label>
                            <Input id="firstName" placeholder="John" {...register('firstName')} />
                            <FormMessage>{errors?.firstName?.message}</FormMessage>
                        </Field>
                        <Field>
                            <Label htmlFor="lastName">Nom</Label>
                            <Input id="lastName" {...register('lastName')} placeholder="Doe" />
                            <FormMessage>{errors?.lastName?.message}</FormMessage>
                        </Field>
                        <Field>
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" {...register('email')} placeholder="email@example.com" />
                            <FormMessage>{errors?.email?.message}</FormMessage>
                        </Field>
                        <FormField
                            control={control}
                            name="roleId"
                            render={({ field }) => (
                                <>
                                    <Select
                                        onValueChange={v => {
                                            const val = parseInt(v);
                                            if (!isNaN(val)) field.onChange(val)
                                        }}
                                        value={field.value?.toString()}>
                                        <SelectTrigger className="w-full max-w-48">
                                            <SelectValue placeholder="Sélectionner un poste" />
                                        </SelectTrigger>
                                        <SelectContent className="max-h-[300px]">
                                            <SelectGroup>
                                                {roles && roles.map((role: Role) => (
                                                    <SelectItem key={role.id} value={role.id.toString()} >
                                                        {role.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                    {!addRoleActive ?
                                        <span
                                            className="text-sm underline underline-offset-2 cursor-pointer text-blue-900 hover:text-blue-600"
                                            onClick={() => setAddRoleActive(true)}
                                        >
                                            <Plus className="inline size-4" /> Ajouter un poste
                                        </span> :
                                        <Input
                                            ref={roleInputRef}
                                            className="h-8"
                                            placeholder="Nom du poste"
                                            value={newRole}
                                            onInput={e => setNewRole(e.currentTarget.value)}
                                            onBlur={handleRoleInputBlur}
                                            onKeyDown={handleRoleInputKeyDown}
                                        />
                                    }
                                    <div className="pb-4">
                                        <FormMessage>{rolesError && 'Erreur de chargement du formulaire'}</FormMessage>
                                        <FormMessage>{errors.roleId && errors?.roleId?.message}</FormMessage>
                                        <FormMessage>{errors.root && errors?.root?.message}</FormMessage>
                                    </div>
                                </>
                            )}
                        />
                    </FieldGroup>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">Annuler</Button>
                        </DialogClose>
                        <Button type="submit" disabled={createEmployee.isPending}>Enregistrer</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default CreateEmployeeForm;
