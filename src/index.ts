import fs from "fs";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const openai = new OpenAI({ apiKey: process.env.OPEN_AI_API_KEY });

(async () => {
    // STEP 1. UPLOAD THE FILE
    // const uploadResult = await openai.files.create({
    //     file: fs.createReadStream(`${__dirname}/fine-tunning-data.jsonl`),
    //     purpose: "fine-tune"
    // });

    
    // console.log(uploadResult)
    /**
     * {
            object: 'file',
            id: 'file-wbaqEJOY7ZI4wBDgbMiiFHkS',
            purpose: 'fine-tune',
            filename: 'fine-tunning-data.jsonl',
            bytes: 24147,
            created_at: 1731927364,
            status: 'processed',
            status_details: null
        }
    */

    // STEP 2. CREATE A FINE TUNE JOB
    // const fineTune = await openai.fineTuning.jobs.create({
    //     training_file: "file-wbaqEJOY7ZI4wBDgbMiiFHkS",
    //     model: "gpt-3.5-turbo"
    // })
    
    // console.log(fineTune);
    /**
     * {
            object: 'fine_tuning.job',
            id: 'ftjob-uq0onEo6Tgj14MOdIQY1k31I',
            model: 'gpt-3.5-turbo-0125',
            created_at: 1731927572,
            finished_at: null,
            fine_tuned_model: null,
            organization_id: 'org-SLaSHJL31EzkPOnmlQiurFkA',
            result_files: [],
            status: 'validating_files',
            validation_file: null,
            training_file: 'file-wbaqEJOY7ZI4wBDgbMiiFHkS',
            hyperparameters: {
                n_epochs: 'auto',
                batch_size: 'auto',
                learning_rate_multiplier: 'auto'
            },
            trained_tokens: null,
            error: {},
            user_provided_suffix: null,
            seed: 1105139656,
            estimated_finish: null,
            integrations: []
        }
    */

    // STEP 3. CHECK STATUS OF JOB
    // const status = await openai.fineTuning.jobs.retrieve("ftjob-uq0onEo6Tgj14MOdIQY1k31I")

    // console.log(status)
    /**
       {
            object: 'fine_tuning.job',
            id: 'ftjob-uq0onEo6Tgj14MOdIQY1k31I',
            model: 'gpt-3.5-turbo-0125',
            created_at: 1731927572,
            finished_at: 1731928016,
            fine_tuned_model: 'ft:gpt-3.5-turbo-0125:personal::AUtsngo3',
            organization_id: 'org-SLaSHJL31EzkPOnmlQiurFkA',
            result_files: [ 'file-3bIqfSyJtdG8qsRU9eVO0P7T' ],
            status: 'succeeded',
            validation_file: null,
            training_file: 'file-wbaqEJOY7ZI4wBDgbMiiFHkS',
            hyperparameters: { n_epochs: 3, batch_size: 1, learning_rate_multiplier: 2 },
            trained_tokens: 13017,
            error: {},
            user_provided_suffix: null,
            seed: 1105139656,
            estimated_finish: null,
            integrations: []
        }
    */

    // STEP 4. USE THE MODEL
    const response = await openai.chat.completions.create({
        model: "ft:gpt-3.5-turbo-0125:personal::AUtsngo3",
        messages: [
            { role: "user", content: "I'm finding it hard to stay positive." }
        ]
    })
    console.log(`Fine tunned response : \n ${response.choices[0].message.content}`)

    const responseRegular = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
            { role: "user", content: "I'm finding it hard to stay positive." }
        ]
    })
    console.log(`Regular response : \n ${responseRegular.choices[0].message.content}`)
})();
