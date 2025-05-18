// yarn add jspdf-autotable
import React from 'react';
import WelcomeDialog from '../components/CompositionEx';
import HocEx from '../components/HocEx';
import ReducerEx from '../components/ReducerEx';

import Html2PDF from '../components/Html2PDF';
import jsPDF from 'jspdf'

import ContextEx from '../components/ContextEx';
import autoTable from 'jspdf-autotable';

import Menu from '../components/Menu';
   function About() {
      return (
         <div>
            <Menu/>
            <h2>About</h2>
            <ContextEx/>
            <button onClick={generatePDF}> Generate PDF</button>
            <HocEx user="Rey"/>
            {/* <Html2PDF/> */}
         </div>
      );
   }
    export default About;

    const generatePDF = () => {
         var doc = new jsPDF('p', 'pt', 'letter')
         // Supply data via script
         var body = [
                    ['SL.No', 'Product Name', 'Price', 'Model'],
                    [1, 'I-phone', 75000, '2021'],
                    [2, 'Realme', 25000, '2022'],
                    [3, 'Oneplus', 30000, '2021'],
                    ]
         // generate auto table with body
         var y = 10;
         doc.setLineWidth(2);
         doc.text(200, y = y + 30, "Product detailed report");
         autoTable(doc, {
             body: body,
             startY: 70,
             theme: 'grid',
                      })
         // save the data to this file
         doc.save('auto_table_with_javascript_data');
     }