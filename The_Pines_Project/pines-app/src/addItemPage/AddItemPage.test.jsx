import { render, screen } from '@testing-library/react';
import { BrowserRouter } from "react-router-dom";
import  React from "react";
import AddItemPage from './AddItemPage';

describe('Add Item Page', () => {
    render(<BrowserRouter><AddItemPage /></BrowserRouter>);

    test('All static text should be displayed', () => {
        const titleElement = screen.getByText("Add/Edit Item");
        expect(titleElement).toBeInTheDocument();

        const itemNameElement = screen.getByText("ITEM NAME*");
        expect(itemNameElement).toBeInTheDocument();

        const isCurrentlyElement = screen.getByText("IS CURRENTLY*");
        expect(isCurrentlyElement).toBeInTheDocument();

        const locationElement = screen.getByText("LOCATION*");
        expect(locationElement).toBeInTheDocument();

        const tagsElement = screen.getByText("TAGS");
        expect(tagsElement).toBeInTheDocument();
    });
});