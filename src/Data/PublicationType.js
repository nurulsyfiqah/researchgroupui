import React from 'react';

export function publicationTypeData() {
    const options = [
        {
          label: 'Publication',
          options: [
            { value: 'Book', label: 'Book' },
            { value: 'Book chapter', label: 'Book chapter' },
            { value: 'Book review', label: 'Book review' },
            { value: 'Dictionary entry', label: 'Dictionary entry' },
            { value: 'Dissertation/Thesis', label: 'Dissertation/Thesis' },
            { value: 'Edited book', label: 'Edited book' },
            { value: 'Encyclopedia entry', label: 'Encyclopedia entry' },
            { value: 'Journal article', label: 'Journal article' },
            { value: 'Journal issue', label: 'Journal issue' },
            { value: 'Magazine article', label: 'Magazine article' },
            { value: 'Manual', label: 'Manual' },
            { value: 'Newsletter article', label: 'Newsletter article' },
            { value: 'Newspaper article', label: 'Newspaper article' },
            { value: 'Online resource', label: 'Online resource' },
            { value: 'Preprint', label: 'Preprint' },
            { value: 'Report', label: 'Report' },
            { value: 'Research tool', label: 'Research tool' },
            { value: 'Review', label: 'Review' },
            { value: 'Supervised student publication', label: 'Supervised student publication' },
            { value: 'Test', label: 'Test' },
            { value: 'Translation', label: 'Translation' },
            { value: 'Website', label: 'Website' },
            { value: 'Working paper', label: 'Working paper' },
          ],
        },  
        {
          label: 'Conference',
          options: [
            { value: 'Conference abstract', label: 'Conference abstract' },
            { value: 'Conference paper', label: 'Conference paper' },
            { value: 'Conference poster', label: 'Conference poster' },
          ],
        },
        {
            label: 'Intellectual Property',
            options: [
                { value: 'Disclosure', label: 'Disclosure' },
                { value: 'License', label: 'License' },
                { value: 'Patent', label: 'Patent' },
                { value: 'Registered copyright', label: 'Registered copyright' },

            ],
          },
          {
            label: 'Other',
            options: [
                { value: 'Annotation', label: 'Annotation' },
                { value: 'Artistic performance', label: 'Artistic performance' },
                { value: 'Data management plan', label: 'Data management plan' },
                { value: 'Dataset', label: 'Dataset' },
                { value: 'Invention', label: 'Invention' },
                { value: 'Lecture/speech', label: 'Lecture/speech' },
                { value: 'Other', label: 'Other' },
                { value: 'Physical object', label: 'Physical object' },
                { value: 'Research technique', label: 'Research technique' },
                { value: 'Software', label: 'Software' },
                { value: 'Spin off company', label: 'Spin off company' },
                { value: 'Standards and policy', label: 'Standards and policy' },
                { value: 'Technical standard', label: 'Technical standard' },
            ],
          },
      ];

      return options;
}