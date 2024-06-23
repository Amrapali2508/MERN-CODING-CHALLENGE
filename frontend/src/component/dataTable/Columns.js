"use client"
import { Button } from "./../../components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "./../../components/ui/dropdown-menu"
import axios from "axios"
import { ArrowDown, MoreHorizontal, PenSquare } from "lucide-react"
import Link from "next/link"
import React from "react"

/**
 * @typedef {Object} Products
 * @property {number} id
 * @property {string} title
 * @property {string} description
 * @property {Number} price
 * @property {Date} dateOfSale
 * @property {string} category
 * @property {boolean} sold
 * @property {string} image
 * 
 */

/** @type {import('@tanstack/react-table').ColumnDef<Products>[]} */

export const columns = [
    {
        accessorKey: 'id',
        header: 'ID'
    },
    {
        accessorKey: 'title',
        header: ({column}) => {
            return (
                <Button
                    variant={'ghost'}
                    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                >
                    Title
                    <ArrowDown className="ml-2 h-4 w-4 "/>
                </Button>
            )
        }
    },
    {
        accessorKey: 'description',
        header: 'Descriptions',
    },
    {
        accessorKey: 'price',
        header: 'Price',
    },
    {
        accessorKey: 'category',
        header: 'Category',
    },
    {
        accessorKey: 'sold',
        header: 'Sold',
    },
    {
        accessorKey: 'dateOfSale',
        header: 'Date Of Sale',
    },
    {
        accessorKey: 'image',
        header: 'Image url',
    },
    {
        id: 'actions',
        header: ({column}) => {
            return(
                <div className="flex gap-2 items-center">
                    Actions
                    <PenSquare className="h-4 w-4"/>
                </div>
            )
        },
        cell: ({row}) => {
            const role = row.original

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant={'ghost'} className="h-8 w-8 p-0">
                            <span className="sr-only">Open Menu</span>
                            <MoreHorizontal className="h-4 w-4"/>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => navigator.clipboard.writeText(role.title)}>
                            Copy Role name
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <Link href={`/home/employee/roles/${role.id}/view`}>
                                View Role
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <Link href={`/home/employee/roles/${role.id}/edit`}>
                                Edit Role
                            </Link>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        }
    }
]

const handleDelete = async (id) => {
    try {
        await axios.delete(`http://localhost:5000/api/dept/${id}`);
        // Handle successful deletion, if needed
    } catch (err) {
        console.error('Error deleting data', err);
    }
};
