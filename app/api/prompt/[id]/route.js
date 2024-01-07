import { connectToDatabase } from "@utils/database";
import Prompt from "@models/prompt";

//GET request {Read}
export const GET = async (req, {params}) => {
    try {
        await connectToDatabase();

        const prompt = await Prompt.findById(params.id).populate('creator');

        if(!prompt) {
            return new Response(JSON.stringify('No prompt found'), {status: 404})
        }
        return new Response(JSON.stringify(prompt), {status: 200}) 
 
    }catch (error) {
        return new Response(JSON.stringify(`Failed to fect data ${error}`), {status: 500})
    }
}

// PATCH (update)
export const PATCH = async (req, {params}) => {
    const {prompt, tag} = await req.json();

    try {
        await connectToDatabase();

        const updatedPrompt = await Prompt.findByIdAndUpdate(params.id, {prompt, tag}, {new: true});

        if(!updatedPrompt) {
            return new Response(JSON.stringify('No prompt found'), {status: 404})
        }
        return new Response(JSON.stringify(updatedPrompt), {status: 200}) 
    } catch (error) {
        return new Response(JSON.stringify(`Failed to fect data ${error}`), {status: 500})
    }
}

//DELETE (delete)
export const DELETE = async (req, {params}) => {
    try {
        await connectToDatabase();

        const deletedPrompt = await Prompt.findByIdAndDelete(params.id);

        if(!deletedPrompt) {
            return new Response(JSON.stringify('No prompt found'), {status: 404})
        }
        return new Response(JSON.stringify(deletedPrompt), {status: 200}) 
    } catch (error) {
        return new Response(JSON.stringify(`Failed to fect data ${error}`), {status: 500})
    }

}