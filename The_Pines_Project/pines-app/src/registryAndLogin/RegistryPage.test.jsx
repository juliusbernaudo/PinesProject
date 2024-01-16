import { render, screen } from '@testing-library/react';
import RegistryPage from './RegistryPage';
import  React from "react";
import { BrowserRouter } from "react-router-dom";

describe('Registry Page', () => {
    render(<BrowserRouter><RegistryPage /></BrowserRouter>);

    test('Register title should be displayed', () => {
        const linkElement = screen.getByText("Register");
        expect(linkElement).toBeInTheDocument();
    });
});